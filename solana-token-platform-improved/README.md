# Solana Token Platform 🚀

A complete mobile-first platform for creating and managing Solana SPL tokens, built with React Native and Expo. This platform provides an intuitive interface for token creation, authority management, and Raydium liquidity pool integration.

## ✨ Features

- **🪙 SPL Token Creation**: Create custom Solana tokens with metadata
- **⚡ Authority Management**: Control mint and freeze permissions
- **💧 Liquidity Pools**: Create and manage Raydium liquidity pools
- **📱 Mobile Optimized**: Perfect for Android tablets and phones
- **🔒 Secure Wallet Integration**: Mobile Wallet Adapter support
- **🎨 Modern UI**: Clean, intuitive interface with React Native Paper

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development and deployment platform
- **TypeScript** - Type-safe development
- **Solana Web3.js** - Blockchain integration
- **Mobile Wallet Adapter** - Wallet connectivity
- **React Navigation** - App navigation
- **React Native Paper** - UI components

## 📱 Compatibility

- **Android**: 7.0+ (API level 24+)
- **iOS**: 12.0+
- **Expo Go**: Latest version
- **Development**: Works in GitHub Codespaces

## 🚀 Complete Setup Instructions

### Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Git installed
- A GitHub account
- Android device with Expo Go app installed

### Option 1: GitHub Codespaces Setup (Recommended)

#### Step 1: Create Codespace

1. Fork or upload this project to your GitHub repository
2. Click the "Code" button on your GitHub repo
3. Select "Create codespace on main"
4. Wait for the environment to initialize (2-3 minutes)

#### Step 2: Install Dependencies

```bash
# Install npm dependencies
npm install

# Install Expo CLI globally (if not already installed)
npm install -g @expo/cli
```

#### Step 3: Environment Setup

```bash
# Copy environment variables
cp .env.example .env

# Edit .env file if needed (optional for development)
code .env
```

#### Step 4: Start Development Server

```bash
# Start Expo development server
npm start

# Or start with specific options
npx expo start --tunnel
```

#### Step 5: Connect Your Mobile Device

1. Open Expo Go app on your Android device
2. Scan the QR code displayed in the terminal
3. The app will download and launch on your device

### Option 2: Local Development Setup

#### Step 1: Clone Repository

```bash
git clone <your-repo-url>
cd solana-token-platform-improved
```

#### Step 2: Install Dependencies

```bash
# Install dependencies
npm install

# Install Expo CLI
npm install -g @expo/cli
```

#### Step 3: Environment Configuration

```bash
cp .env.example .env
```

#### Step 4: Start Development

```bash
npm start
```

## 📝 Environment Variables

Create a `.env` file from `.env.example`:

```env
# Solana Configuration
EXPO_PUBLIC_SOLANA_NETWORK=devnet
EXPO_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com

# Optional: Custom RPC endpoints
# EXPO_PUBLIC_RPC_ENDPOINT=https://your-custom-rpc.com

# Raydium Configuration (for liquidity pools)
EXPO_PUBLIC_RAYDIUM_PROGRAM_ID=675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8

# App Configuration
EXPO_PUBLIC_APP_NAME=Solana Token Platform
EXPO_PUBLIC_APP_VERSION=2.0.0
```

## 🎯 Usage Guide

### 1. Wallet Connection

1. Launch the app on your device
2. Tap "Connect Wallet" on the welcome screen
3. Choose your wallet (Phantom, Solflare, etc.)
4. Approve the connection

### 2. Creating Tokens

1. Navigate to "Create Token" from the home screen
2. Fill in token details:
   - **Name**: Your token's full name
   - **Symbol**: Token ticker (e.g., "MYTOKEN")
   - **Description**: Token description
   - **Decimals**: Precision level (usually 6-9)
   - **Supply**: Initial token supply
3. Review transaction details
4. Confirm the transaction in your wallet

### 3. Managing Tokens

1. Go to "Manage Token" section
2. Enter your token's mint address
3. Available actions:
   - Mint additional tokens
   - Revoke mint authority
   - Revoke freeze authority
   - Burn tokens

### 4. Liquidity Pools (Coming Soon)

1. Navigate to "Liquidity" section
2. Create new pools or manage existing ones
3. Add/remove liquidity as needed

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start with tunnel (for external device testing)
npm run start -- --tunnel

# Run on Android
npm run android

# Run on iOS
npm run ios

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🏗️ Project Structure

```
solana-token-platform-improved/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   └── wallet/          # Wallet-related components
│   ├── screens/             # App screens
│   ├── navigation/          # Navigation configuration
│   ├── services/            # Business logic and API calls
│   ├── utils/               # Utility functions
│   ├── constants/           # App constants
│   ├── hooks/               # Custom React hooks
│   └── types/               # TypeScript type definitions
├── assets/                  # Images, icons, fonts
├── App.tsx                  # Root component
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔍 Troubleshooting

### Common Issues

#### "Network request failed" error
- Ensure you're connected to the internet
- Try switching networks in the app settings
- Check if the RPC endpoint is responsive

#### Wallet connection issues
- Make sure you have a compatible wallet installed
- Clear wallet cache and try reconnecting
- Ensure your wallet supports mobile connections

#### Expo Go crashes or won't load
- Restart Expo Go app
- Clear Expo Go cache
- Try running with `--tunnel` flag

#### GitHub Codespaces issues
- Ensure port forwarding is enabled
- Try using the tunnel option: `npx expo start --tunnel`
- Check if all dependencies installed correctly

### Performance Tips

- Use devnet for testing to avoid mainnet fees
- Keep the number of simultaneous connections low
- Clear app cache regularly
- Monitor wallet connection status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js) - Solana blockchain interaction
- [Expo](https://expo.dev/) - React Native development platform
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [React Native Paper](https://reactnativepaper.com/) - UI components

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Check the [Expo documentation](https://docs.expo.dev/)
- Review [Solana documentation](https://docs.solana.com/)

---

**Made with ❤️ for the Solana ecosystem**
