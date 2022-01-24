const LOG_ENABLED = true;

export function logToConsole(message, args) {
    if (LOG_ENABLED) {
        console.log('QuizApp', message, args);
    }
}
