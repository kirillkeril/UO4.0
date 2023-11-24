from transformers import pipeline


def nerTask(textForNer):
    classifier = pipeline("ner", model='Babelscape/wikineural-multilingual-ner')
    results =classifier(textForNer)
    return results

if __name__ == '__main__':
    print(nerTask('Я Борис и я крайне ненавижу Волгоград'))
