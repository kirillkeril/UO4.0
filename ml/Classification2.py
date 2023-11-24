import itertools
import os

import numpy as np
import pandas as pd
import tensorflow as tf

from sklearn.preprocessing import LabelBinarizer, LabelEncoder
from sklearn.metrics import confusion_matrix

import keras
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.preprocessing import text, sequence
from keras import utils


def save_model(model):
    # After training the model...

    # Save the model to a file
    model.save('my_model.keras')

    # Save the weights of the model to a file
    model.save_weights('my_model_weights.keras')


def load_model(modelname, weightsname, testdata):
    # Load the model from a file
    loaded_model = keras.models.load_model(modelname)

    loaded_model.summary()

    # Load the weights of the model from a file
    loaded_model.load_weights(weightsname)
    print('Model successfully loaded')

    # Using model for prediction
    return loaded_model.predict(testdata)


def main():
    # Load the data from a csv file
    df = pd.read_csv('new_file.csv')

    train_size = int(len(df) * .7)
    train_posts = df['text'][:train_size]
    train_tags = df['class'][:train_size]

    test_posts = df['text'][train_size:]
    test_tags = df['class'][train_size:]

    max_words = 1000
    tokenize = text.Tokenizer(num_words=max_words, char_level=False)
    tokenize.fit_on_texts(train_posts)  # only fit on train

    x_train = tokenize.texts_to_matrix(train_posts)
    x_test = tokenize.texts_to_matrix(test_posts)

    encoder = LabelEncoder()
    encoder.fit(train_tags)
    y_train = encoder.transform(train_tags)
    y_test = encoder.transform(test_tags)

    num_classes = np.max(y_train) + 1
    y_train = utils.to_categorical(y_train, num_classes)
    y_test = utils.to_categorical(y_test, num_classes)

    # Be free to change configuration here
    batch_size = 32
    epochs = 2

    # Build the model
    model = Sequential()
    model.add(Dense(512, input_shape=(max_words,)))
    model.add(Activation('relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes))
    model.add(Activation('softmax'))

    model.compile(loss='categorical_crossentropy',
                  optimizer='adam',
                  metrics=['accuracy'])

    history = model.fit(x_train, y_train,
                        batch_size=batch_size,
                        epochs=epochs,
                        verbose=1,
                        validation_split=0.1)

    score = model.evaluate(x_test, y_test,
                           batch_size=batch_size, verbose=1)
    print('Test accuracy:', score[1])
    return model


if __name__ == '__main__':
    model = main()
    save_model(model)
