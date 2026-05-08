#!/bin/bash

# Configuration
VM_IP="34.70.255.177"
VM_USER="chiragaswal2"

echo "📦 Zipping project files..."
zip -r promptwar.zip . -x "*.venv*" "*__pycache__*" "*.git*"

echo "🚀 Uploading to Google Cloud VM ($VM_IP)..."
scp -o StrictHostKeyChecking=no promptwar.zip $VM_USER@$VM_IP:~

echo "🛠️ Unzipping and deploying on the VM..."
ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP << 'EOF'
  # Install docker if not present
  if ! command -v docker &> /dev/null; then
      echo "Installing Docker..."
      sudo apt-get update
      sudo apt-get install -y ca-certificates curl
      sudo install -m 0755 -d /etc/apt/keyrings
      sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
      sudo chmod a+r /etc/apt/keyrings/docker.asc
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt-get update
      sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      sudo usermod -aG docker $USER
  fi

  unzip -o promptwar.zip -d promptwar
  cd promptwar
  
  echo "Building Docker image..."
  sudo docker build -t aura-engine .
  
  echo "Stopping existing containers..."
  sudo docker stop aura-engine || true
  sudo docker rm aura-engine || true
  
  echo "Running new container..."
  sudo docker run -d -p 80:8000 --name aura-engine aura-engine
  
  echo "✅ Deployment complete. Access API at http://$VM_IP/"
EOF

echo "🧹 Cleaning up local zip..."
rm promptwar.zip
