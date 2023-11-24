import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer
from keras.models import Sequential
from keras.layers import Embedding, Dense, Flatten
from keras.preprocessing.sequence import pad_sequences

def data_loader(csvf):
    # Load the data
    data = pd.read_csv(csvf)
    return data

def creating_model(data):
    # Check the number of unique classes
    classes = data['class'].unique()
    print(f"Number of unique classes: {len(classes)}")

    # Label encoding
    encoder = LabelEncoder()
    encoder.fit(data['class'])

    # Tokenization
    tokenizer = Tokenizer(num_words=5) # Consider reducing the vocabulary size
    tokenizer.fit_on_texts(data['text'])
    sequences = tokenizer.texts_to_sequences(data['text'])

    # Padding
    padded_sequences = pad_sequences(sequences, padding='post', maxlen=5)

    # Split the data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(padded_sequences, data['class'], test_size=0.2, random_state=42)

    # Define the model
    model = Sequential()
    model.add(Embedding(5, 7, input_length=5)) # Adjust the input length accordingly
    model.add(Flatten())
    model.add(Dense(5, activation='softmax'))
    return model, x_train, x_test, y_train, y_test

def train_model(model, x_train, x_test, y_train, y_test):
    # Compile the model
    model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Train the model
    model.fit(x_train, y_train, epochs=5, verbose=1)

    # Evaluate the model
    loss, accuracy = model.evaluate(x_test, y_test, verbose=0)
    print(f"Test accuracy: {accuracy*100}%")
    return model

def save_model(model):
    model.save('my_model.h5')

def run(rawdata):
    data = data_loader(rawdata)
    model, x_train, x_test, y_train, y_test = creating_model(data)
    model = train_model(model, x_train, x_test, y_train, y_test)
    save_model(model)

if __name__ == '__main__':
    run('text_series_full1.csv')

