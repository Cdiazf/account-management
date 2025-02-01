// src/utils/validation.ts

/**
 * Validates an email address format.
 * @param email - The email string to validate.
 * @returns True if valid, otherwise false.
 */
export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  /**
   * Validates a strong password.
   * Must contain at least 8 characters, one letter, one number, and one special character.
   * @param password - The password string to validate.
   * @returns True if valid, otherwise false.
   */
  export const validatePassword = (password: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
  
  /**
   * Validates a username.
   * Must be 4-15 characters long and only contain letters, numbers, or underscores.
   * @param username - The username string to validate.
   * @returns True if valid, otherwise false.
   */
  export const validateUsername = (username: string): boolean => {
    return /^[a-zA-Z0-9_]{4,15}$/.test(username);
  };
  