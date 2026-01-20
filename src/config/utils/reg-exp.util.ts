export class RegExp {
    public static EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    public static PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
}