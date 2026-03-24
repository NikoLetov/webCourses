export type ApiErrorResponse = {
	success: false
	error: {
		code: string
		message: string
		status: number
	}
}

export type ApiSuccessResponse<T> = {
	success: true
	data: T
	status: number
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>

export class ApiError extends Error {
	public readonly code: string
	public readonly status: number

	constructor(code: string, message: string, status: number = 500) {
		super(message)
		this.code = code
		this.status = status
		this.name = this.constructor.name
	}

	toResponse(): ApiErrorResponse {
		return {
			success: false,
			error: {
				code: this.code,
				message: this.message,
				status: this.status
			}
		}
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string = 'Not authorized') {
		super('UNAUTHORIZED', message, 401)
	}
}

export class RegistrationError extends ApiError {
	constructor(message: string = 'Registration failed') {
		super('REGISTRATION_FAILED', message, 400)
	}
}
