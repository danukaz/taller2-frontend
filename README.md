# Taller 2 - Frontend E-Commerce

Frontend de una aplicación de E-Commerce desarrollada con Next.js 15, React 19 y TypeScript.

## 🔧 Requisitos del Sistema

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior (o yarn/pnpm como alternativa)
- **Git**: Para control de versiones y hooks

## 🚀 Tecnologías Utilizadas

- **Framework**: Next.js 15.3.3
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Icons**: Lucide React
- **Development**: 
  - Husky (Git Hooks)
  - Lint-staged
  - ESLint
  - Prettier

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/danukaz/taller2-frontend
   cd taller2-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Git Hooks:**
   ```bash
   npm run prepare
   ```

## ⚙️ Configuración

1. **Variables de entorno:**
   Renombrar el archivo `.env.example` en la raíz del proyecto a `.env` y rellenar las variables de entorno:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   DOMAIN=localhost
   ```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

### Otros comandos útiles
```bash
# Linting
npm run lint

# Formateo de código
npm run format

# Verificación de tipos TypeScript
npm run type-check
```

## 🔗 Backend

Este frontend se conecta con un backend desarrollado en .NET 9.0. Para ejecutar el sistema completo:

1. **Configurar el Backend:**
   - Seguir las instrucciones del repositorio: https://github.com/FernandoChav/AyudantiaWebMovil
   - Asegurarse de que el backend esté ejecutándose en el puerto configurado

2. **Verificar la conexión:**
   - El frontend está configurado para conectarse al backend a través de las variables de entorno
   - Asegurarse de que las URLs en `.env` coincidan con la configuración del backend

## 👥 Integrantes

| Nombre | Correo | RUT |
|--------|--------|-----|
| **Daniel Alexis Tomigo Contreras** | daniel.tomigo@alumnos.ucn.cl | 21.564.036-1 |
| **Mayckol Enrique Olivares Donoso** | mayckol.olivares@alumnos.ucn.cl | 21.153.340-4 |

---
