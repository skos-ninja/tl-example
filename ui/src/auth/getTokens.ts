export function getTokens(): string[] {
    const tokenString = localStorage.getItem("tokens") || "[]";
    const tokens: string[] = JSON.parse(tokenString) || [];

    return tokens;
}