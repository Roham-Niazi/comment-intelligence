import joblib
import hazm
import emoji
import numpy as np
import string
from pathlib import Path


class CommentAnalyzer:
	def __init__(self):
		self.normalizer=hazm.Normalizer()
		self.word_tokenizer=hazm.WordTokenizer()
		self.lemmatizer=hazm.Lemmatizer()

		self.stopwords=hazm.utils.stopwords_list()
		self.stopwords=list(map(self.clean_stopword, self.stopwords))


		for word in ["عالی", "خوب", "خوبی", "بی"]: self.stopwords.remove(word)

		BASE_DIR = Path(__file__).resolve().parent

		self.offensive_detection_pipeline=joblib.load(
			BASE_DIR / "models" / "offensive_detection_pipeline.joblib"
		)

		self.recommendation_detection_pipeline=joblib.load(
			BASE_DIR / "models" / "recommendation_detection_pipeline.joblib"
		)


	def clean_stopword(self, stopword):
		return stopword.replace("آ", "ا")


	def remove_chars(self, text, chars):
		for char in chars: text=text.replace(char, " ")
		return text

	def preprocess(self, text):
		if not isinstance(text, str): return np.nan

		text=text.lower()
		text=self.remove_chars(text, string.punctuation+"؟،")

		text=emoji.replace_emoji(text, replace=" ")

		normalized_txt=self.normalizer.normalize(text).replace("آ", "ا")
		normalized_txt=self.remove_chars(normalized_txt, "۰۱۲۳۴۵۶۷۸۹\u200c")
		
		tokens=self.word_tokenizer.tokenize(normalized_txt)

		tokens=list(map(
			lambda token: self.lemmatizer.lemmatize(token).split("#")[0],
			tokens
		))

		tokens=list(filter(
			lambda token: token not in self.stopwords,
			tokens
		))

		if len(tokens)==0: return np.nan

		return " ".join(tokens)


	def predict(self, comment):
		positive_idx = list(self.offensive_detection_pipeline.classes_).index(1)

		comment=self.preprocess(comment)
		offensive_result=self.offensive_detection_pipeline.predict_proba([comment])[0, positive_idx]
		recommendation_result=self.recommendation_detection_pipeline.predict_proba([comment])[0, 1]

		return {
			"recommendation_percent": recommendation_result,
			"offensivity_percent": offensive_result
		}


comment_analyzer=CommentAnalyzer()