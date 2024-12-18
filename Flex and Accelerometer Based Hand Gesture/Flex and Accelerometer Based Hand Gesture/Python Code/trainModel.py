import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Load the data from the Excel file
def load_data(file_path):
    try:
        # Read the Excel file
        data = pd.read_excel(file_path)
        
        # Ensure that all columns are read as float, except the 'word' column
        for column in data.columns:
            if column != 'word':
                data[column] = data[column].astype(float)
        
        return data
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

# Preprocess the data
def preprocess_data(data):
    try:
        # Extract features (X) and target variable (y)
        X = data.drop('word', axis=1)
        y = data['word']
        
        # Encode the target variable 'word' as it's categorical
        label_encoder = LabelEncoder()
        y = label_encoder.fit_transform(y)
        
        return X, y, label_encoder
    except Exception as e:
        print(f"Error preprocessing data: {e}")
        return None, None, None

# Train the XGBoost model
def train_model(X_train, y_train):
    try:
        model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss')
        model.fit(X_train, y_train)
        return model
    except Exception as e:
        print(f"Error training model: {e}")
        return None

# Save the trained model
def save_model(model, label_encoder, model_path, encoder_path):
    try:
        joblib.dump(model, model_path)
        joblib.dump(label_encoder, encoder_path)
        print(f"Model saved to {model_path} and encoder saved to {encoder_path}")
    except Exception as e:
        print(f"Error saving model: {e}")

# Plot and save class distribution
def plot_class_distribution(y, label_encoder):
    plt.figure(figsize=(10, 6))
    sns.countplot(x=label_encoder.inverse_transform(y))
    plt.title('Class Distribution')
    plt.xlabel('Classes')
    plt.ylabel('Count')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('class_distribution.png')
    plt.close()

# Plot and save confusion matrix
def plot_confusion_matrix(y_true, y_pred, label_encoder):
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_)
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.tight_layout()
    plt.savefig('confusion_matrix.png')
    plt.close()

# Plot and save feature importance
def plot_feature_importance(model, feature_names):
    plt.figure(figsize=(12, 8))
    xgb.plot_importance(model, max_num_features=10, importance_type='weight')
    plt.title('Feature Importance')
    plt.tight_layout()
    plt.savefig('feature_importance.png')
    plt.close()

# Create a bar graph
def plot_and_save_metrics(accuracy, precision, recall, f1, file_path='metrics_bar_graph.png'):
    metrics = ['Accuracy', 'Precision', 'Recall']
    scores = [accuracy, precision, recall]
    
    # Plotting
    plt.figure(figsize=(8, 6))
    plt.bar(metrics, scores, color=['skyblue', 'lightgreen', 'salmon'])
    plt.ylim(0, 1)  # Set y-axis limits to [0, 1]
    
    # Adding text on top of the bars
    for i, score in enumerate(scores):
        plt.text(i, score + 0.02, f"{score * 100:.2f}%", ha='center', fontsize=12)
    
    plt.title('Model Performance Metrics')
    plt.ylabel('Score')
    plt.tight_layout()
    
    # Save the plot as a PNG file
    plt.savefig(file_path)
    plt.close()
    print(f"Bar graph saved as {file_path}")

# Main function
def main():
    file_path = 'dataset.xlsx'  # Replace with the path to your Excel file
    model_path = 'xgboost_model.pkl'
    encoder_path = 'label_encoder.pkl'
    
    # Load and preprocess the data
    data = load_data(file_path)
    if data is None:
        return
    
    X, y, label_encoder = preprocess_data(data)
    if X is None or y is None or label_encoder is None:
        return
    
    # Split the data into training and testing sets (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train the model
    model = train_model(X_train, y_train)
    if model is None:
        return
    
    # Predict on the test set
    y_pred = model.predict(X_test)
    
    # Evaluate the model
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')
    
    print(f'Accuracy: {accuracy * 100:.2f}%')
    print(f'Precision: {precision * 100:.2f}%')
    print(f'Recall: {recall * 100:.2f}%')
    print(f'F1 Score: {f1 * 100:.2f}%')
    
    # Save the model and encoder
    save_model(model, label_encoder, model_path, encoder_path)
    
    # Plot and save class distribution
    plot_class_distribution(y, label_encoder)
    
    # Plot and save confusion matrix
    plot_confusion_matrix(y_test, y_pred, label_encoder)
    
    # Plot and save feature importance
    plot_feature_importance(model, X.columns)

    plot_and_save_metrics(accuracy, precision, recall, f1)
    
# Run the script
if __name__ == "__main__":
    main()
