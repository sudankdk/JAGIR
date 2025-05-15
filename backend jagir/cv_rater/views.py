from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CVDocument
from .utils import CVScorer
from django.conf import settings
import os

cv_scorer = CVScorer()

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_cv(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

    cv_file = request.FILES['file']
    title = request.data.get('title', cv_file.name)

    cv_doc = CVDocument(title=title, file=cv_file)
    cv_doc.save()

    file_path = os.path.join(settings.MEDIA_ROOT, cv_doc.file.name)

    try:
        score = cv_scorer.score_cv(file_path)
        label = "Good CV" if score > 0.5 else "Needs Improvement"

        cv_doc.score = score
        cv_doc.save()

        return Response({
            'success': True,
            'cv_id': cv_doc.id,
            'score': score,
            'label': label
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_cv_score(request, cv_id):
    try:
        cv_doc = CVDocument.objects.get(id=cv_id)
        label = "Good CV" if cv_doc.score and cv_doc.score > 0.5 else "Needs Improvement"

        return Response({
            'cv_id': cv_doc.id,
            'title': cv_doc.title,
            'score': cv_doc.score,
            'label': label,
            'uploaded_at': cv_doc.uploaded_at
        }, status=status.HTTP_200_OK)

    except CVDocument.DoesNotExist:
        return Response({'error': 'CV not found'}, status=status.HTTP_404_NOT_FOUND)
