
export function secondsToformattedTime(seconds: number): string {
    return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`;
}
