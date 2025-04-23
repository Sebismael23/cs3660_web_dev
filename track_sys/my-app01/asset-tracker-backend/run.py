# run.py
import os
import sys
from dotenv import load_dotenv

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

# Import the create_app function from the main app package
from app import create_app 

# Determine environment
config_name = os.environ.get('FLASK_ENV', 'development')

# Create Flask application instance
app = create_app(config_name)

if __name__ == '__main__':
    # Run the application
    app.run(host='0.0.0.0', port=5000)