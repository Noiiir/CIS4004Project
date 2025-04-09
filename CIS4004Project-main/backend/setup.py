import os
import secrets
from pathlib import Path

def generate_env_file():
    # Generate a secure secret key
    secret_key = secrets.token_urlsafe(50)
    
    # Get the domain name
    domain = input("Enter your domain name (or press enter for localhost): ") or "localhost"
    
    # Get database details
    db_type = input("Enter database type (sqlite/postgresql) [sqlite]: ") or "sqlite"
    
    if db_type == "postgresql":
        db_user = input("Enter database user: ")
        db_pass = input("Enter database password: ")
        db_name = input("Enter database name: ")
        db_host = input("Enter database host [localhost]: ") or "localhost"
        db_url = f"postgresql://{db_user}:{db_pass}@{db_host}:5432/{db_name}"
    else:
        db_url = "sqlite:///db.sqlite3"

    # Create .env file
    env_content = f"""DEBUG=False
ALLOWED_HOSTS={domain}
DATABASE_URL={db_url}
CORS_ALLOWED_ORIGINS=https://{domain}
CSRF_TRUSTED_ORIGINS=https://{domain}
SECRET_KEY={secret_key}
"""

    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("\nEnvironment file created successfully!")
    print("Please review and adjust the .env file as needed.")

if __name__ == "__main__":
    generate_env_file()