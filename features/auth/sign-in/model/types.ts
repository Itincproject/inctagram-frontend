export type LoginRequest = {
    usernameOrEmail: string
    password: string
}

export type LoginResponse = {
    accessToken: string
}

export type LoginErrors = {
    email?: string
    password?: string
}