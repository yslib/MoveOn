from django.db import models
from django.contrib.auth.models import User

class Sentence(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_sentence = models.TextField()
    blank_sentence = models.TextField()
    user_answer = models.TextField(blank=True)

    def __str__(self):
        return self.original_sentence

# 创建一个新的 Sentence 对象
sentence = Sentence(user="ysl", original_sentence="This is a sentence.", blank_sentence="This is a _____.", user_answer="")
sentence.save()

# 检索所有 Sentence 对象
sentences = Sentence.objects.all()

s = Sentence.objects.filter(user="ysl")

# 更新一个 Sentence 对象
sentence.user_answer = "This is a test."
sentence.save()