# Voice-Enabled ATM Service

This project is a Svelte-based voice-enabled ATM service application. The app allows users to interact with an ATM system using voice commands, such as checking their balance, withdrawing, and depositing money.

## Features

- **Speech Recognition**: Uses the Web Speech API to recognize and process user commands.
- **Speech Synthesis**: Provides voice feedback to guide users through the ATM operations.
- **Voice Commands**: Users can check balance, withdraw, and deposit money through voice.
- **Session Control**: Users can start, repeat instructions, or end the session using voice commands.

## Technologies Used

- **Svelte**: A front-end framework used to build the application.
- **TypeScript**: Adds type safety to the Svelte components.
- **Web Speech API**: Utilized for speech recognition and synthesis.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/voice-enabled-atm.git
    cd voice-enabled-atm
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the application, run:

```bash
npm run dev
# or
yarn dev
```

### How It Works

1. **Voice Initialization**: Upon loading, the app initializes speech synthesis and speech recognition. Available voices are loaded for the user to select.
2. **Speech Recognition**: When a key is pressed down, the app begins recognizing speech. Upon releasing the key, speech recognition stops.
3. **Voice Commands**: The application processes the recognized speech to perform tasks such as:

- Check Balance: Say "balance" to hear the current account balance.
- Withdraw Money: Say "withdraw [amount] naira" to withdraw a specific amount.
- Deposit Money: Say "deposit [amount] naira" to deposit a specific amount.
End Session: Say "cancel" to end the session.
