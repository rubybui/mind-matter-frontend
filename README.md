# Mind Matter - Mental Health Tracking Application

## Overview
Mind Matter is a mental health tracking application developed with support from the WISYS (Wisconsin Alumni Research Foundation) grant. The application aims to provide users with tools to monitor and improve their mental well-being through regular assessments, goal tracking, and personalized insights.

# mind_matter

Frontend Application: [Mind Matter Frontend](https://mind-matter-frontend.vercel.app/)

## Project Structure - Feature-Based Modular Frontend Structure 

```
mind-matter-frontend/
├── app/                      # Main application directory
│   ├── config.ts            # API and environment configuration
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx  # Authentication context
│   ├── survey.tsx           # Survey list screen
│   ├── surveyquestionscreen.tsx  # Survey questions screen
│   ├── profile.tsx          # User profile screen
│   ├── signin.tsx           # Sign in screen
│   └── theme.ts             # Application theme configuration
│
├── components/              # Reusable components
│   ├── questions/          # Question type components
│   │   ├── BaseQuestionCard.tsx
│   │   ├── LinkertScaleQuestion.tsx
│   │   └── YesNoQuestion.tsx
│   ├── surverys/          # Survey-related components
│   │   ├── SurveyList.tsx
│   │   └── SurveyCard.tsx
│   └── themed/            # Themed UI components
│       └── ThemedButton.tsx
│
└── assets/                # Static assets
    └── images/           # Image assets

```


## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS/Android:
```bash
npm run ios
# or
npm run android
```

## Environment Setup

Create a `.env` file with the following variables:
```
API_BASE_URL=your_api_url
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments
This project's design is inspired by and acknowledges the GoalGazor goal tracking application design from Figma Community (https://www.figma.com/community/file/1313080322821540429/goalgazor-goal-tracking-application). We extend our gratitude to the original designers for their innovative approach to goal tracking interfaces.

## Key Features
- **User Authentication**: Secure login and account management
- **Mental Health Assessments**: Regular check-ins and progress tracking
- **Streak System**: Daily engagement tracking to encourage consistent usage
- **Crisis Plan / SOS**: Emergency resources and safety planning
- **Consent Management**: User control over data sharing and feature access
- **Cross-device Support**: Seamless experience across multiple devices
- **Privacy-Focused**: User data protection and consent-based features

## Technology Stack
- **Frontend**: React Native with Expo
- **Routing**: Expo Router
- **State Management**: React Context API
- **UI Components**: Custom themed components
- **Icons**: Expo Vector Icons
- **Styling**: React Native StyleSheet

## System Architecture
The application follows a modern mobile-first architecture:
- **Presentation Layer**: React Native components and screens
- **Business Logic**: Custom hooks and context providers
- **Data Layer**: Local storage and API integration
- **Authentication**: Secure token-based authentication system

## Key Workflows
1. **User Onboarding**
   - Account creation
   - Initial assessment
   - Consent management
   - Profile setup

2. **Daily Usage**
   - Regular check-ins
   - Progress tracking
   - Streak maintenance
   - Assessment completion

3. **Account Management**
   - Profile updates
   - Consent modifications
   - Device management
   - Account deletion

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mind-matter-frontend.git
   cd mind-matter-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

### Environment Setup
Create a `.env` file in the root directory with the following variables:
```
API_URL=your_api_url
AUTH_TOKEN=your_auth_token
```


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please open an issue in the GitHub repository or contact the development team.
