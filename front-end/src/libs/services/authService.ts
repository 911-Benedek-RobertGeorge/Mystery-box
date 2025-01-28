import { VITE_ENV_BACKEND_URL } from '../config'

export async function getSignInMessage(publicKey: string): Promise<string> {
    const response = await fetch(
        `${VITE_ENV_BACKEND_URL}/auth/reown/sign-in/${publicKey}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                origin: window.location.origin,
            },
        }
    )
    if (!response.ok) {
        throw new Error('Failed to get sign-in message')
    }

    return response.text()
}

export async function verifySignature(
    message: string,
    signature: string
): Promise<string> {
    const response = await fetch(
        `${VITE_ENV_BACKEND_URL}/auth/reown/verify-sign-in`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                signature,
            }),
        }
    )

    if (!response.ok) {
        throw new Error('Failed to verify signature')
    }

    const data = await response.json()
    return data.jwt
}
