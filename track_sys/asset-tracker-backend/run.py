import os
import sys
from dotenv import load_dotenv

# Add current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

# Load environment variables
load_dotenv()


# Determine environment
config_name = os.environ.get('FLASK_ENV', 'development')


try:
    # Import the create_app function from the main app package
    from app import create_app 
    
    # Create Flask application instance
    app = create_app(config_name)

    if __name__ == '__main__':
        debug_mode = config_name == 'development'
        # Run the application
        app.run(
            host='0.0.0.0',
            port=int(os.environ.get('PORT', 5000)),
            debug=debug_mode
        )
except Exception as e:
    print(f"Error starting the application: {e}")
    sys.exit(1)