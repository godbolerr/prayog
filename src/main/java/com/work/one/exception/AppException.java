/**
 * 
 */
package com.work.one.exception;

/**
 * Base Exception class for the project.
 * 
 * @author 115750
 *
 */
public class AppException extends Exception {
	
	String code;

	/**
	 * 
	 */
	private static final long serialVersionUID = -6443115527753059114L;

	/**
	 * 
	 */
	public AppException() {
		// TODO Auto-generated constructor stub
	}

	
	/**
	 * @param message
	 */
	public AppException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param cause
	 */
	public AppException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public AppException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 * @param enableSuppression
	 * @param writableStackTrace
	 */
	public AppException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

}
