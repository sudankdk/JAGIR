# import os
# import torch
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# from PyPDF2 import PdfReader
# import re
# from transformers import DistilBertConfig


# class CVScorer:
#     def __init__(self):
#         model_name = "distilbert-base-uncased"
#         config = DistilBertConfig.from_pretrained(model_name)
#         config.num_labels = 1  # Single output for score
#         self.tokenizer = AutoTokenizer.from_pretrained(model_name)
#         self.model = AutoModelForSequenceClassification.from_pretrained(model_name, config=config)


#     def extract_text_from_pdf(self, pdf_path):
#         text=""
#         with open(pdf_path,'rb') as file:
#             pdf_reader= PdfReader(file)
#             for page in pdf_reader.pages:
#                 text+=page.extract_text()+"\n"
#         return text
    
#     def preprocess_text(self, text):
#         text = re.sub(r'\s+', ' ', text).strip()
#         return text
    
#     def score_cv(self, cv_path):
#         """Score a CV document"""
#         # Extract text from CV
#         cv_text = self.extract_text_from_pdf(cv_path)
#         cv_text = self.preprocess_text(cv_text)
        
#         # Tokenize the text
#         inputs = self.tokenizer(cv_text, 
#                                return_tensors="pt", 
#                                truncation=True, 
#                                max_length=512)
        
#         # Get model prediction
#         with torch.no_grad():
#             outputs = self.model(**inputs)
            
#         # For a binary classifier (good CV vs. bad CV)
#         # Assuming the model outputs logits, apply sigmoid to get score between 0 and 1
#         score = torch.sigmoid(outputs.logits).item()
        
#         # For a multi-class classifier, you might want to return the class with highest probability
#         # Or a weighted average of the class probabilities
        
#         return score

import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from PyPDF2 import PdfReader
import re

class CVScorer:
    def __init__(self):
        # Use a fine-tuned model for sequence classification
        model_name = "distilbert-base-uncased-finetuned-sst-2-english"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)

    def extract_text_from_pdf(self, pdf_path):
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PdfReader(file)
            for page in pdf_reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        return text

    def preprocess_text(self, text):
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def score_cv(self, cv_path):
        cv_text = self.extract_text_from_pdf(cv_path)
        cv_text = self.preprocess_text(cv_text)

        inputs = self.tokenizer(cv_text, return_tensors="pt", truncation=True, max_length=512)

        with torch.no_grad():
            outputs = self.model(**inputs)

        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)
        confidence = probs[:, 1].item()  # Confidence of "positive" class

        return confidence
