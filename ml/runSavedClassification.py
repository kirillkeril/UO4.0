import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import load_model


def load_model(filename):
    return load_model(filename)

def predict_future(rawdata, model):
    data = data_loader(rawdata)
    x_test = prepare_input_data(data)
    prediction = model.predict(x_test)
    return prediction

def main():
    model = load_model('my_model.h5')
    rawdata = get_new_data()
    prediction = predict_future(rawdata, model)
    print('Future prediction:', prediction)

if __name__ == '__main__':
    main()