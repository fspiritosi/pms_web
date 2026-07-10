#!/bin/bash

# Script para crear ZIP de deploy para Dokploy
# Uso: ./create-deploy-zip.sh

set -e

echo "🚀 Creando paquete de deploy para Dokploy..."

# Limpiar build anterior si existe
echo "📦 Limpiando builds anteriores..."
rm -rf deploy-package
rm -f pms-web-deploy.zip

# Crear directorio temporal
mkdir -p deploy-package

# Copiar dist completo
echo "📁 Copiando archivos de producción..."
cp -r dist deploy-package/

# Copiar package.json (necesario para npm start)
cp package.json deploy-package/

# Copiar package-lock.json para instalar dependencias exactas
cp package-lock.json deploy-package/

# Crear un README para el deploy
cat > deploy-package/README.md << 'EOF'
# PMS Web - Deploy Package

## Instalación en Dokploy

1. Subir este ZIP a Dokploy
2. Configurar variables de entorno necesarias
3. Comando de inicio: `npm ci --omit=dev && npm start`
4. Puerto: 4321

## Variables de entorno requeridas

- NODE_ENV=production
- HOST=0.0.0.0
- PORT=4321

EOF

# Crear el ZIP
echo "🗜️  Comprimiendo archivos..."
cd deploy-package
zip -r ../pms-web-deploy.zip . -q
cd ..

# Limpiar directorio temporal
rm -rf deploy-package

echo "✅ Paquete creado: pms-web-deploy.zip"
echo "📊 Tamaño del archivo:"
ls -lh pms-web-deploy.zip | awk '{print $5}'
echo ""
echo "📤 Ahora puedes subir pms-web-deploy.zip a Dokploy"
