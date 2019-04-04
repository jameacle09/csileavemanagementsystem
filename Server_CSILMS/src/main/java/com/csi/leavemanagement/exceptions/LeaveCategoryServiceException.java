package com.csi.leavemanagement.exceptions;

public class LeaveCategoryServiceException extends Exception {

	/** For CREATE operation when record with same primary key is found */
	public final static int LEAVE_CATEGORY_ALREADY_EXIST = 1;
	
	/** For READ, UPDATE, DELETE operation when primary key not found */
	public final static int LEAVE_CATEGORY_NOT_FOUND = 2;
	
	/** For undefined exception code */
	public final static int LEAVE_CATEGORY_UNDEFINED = 99;
	
	/** Code for this Translate Item Service Exception*/
	private int exceptionCode;

	/** 
	 * Constructs a new Leave Category Service Exception of specified exception code and detail message 
	 * @param exceptionCode The code for this exception. The exception code is saved for later retrieval by {@link #getExceptionCode()}) method
	 */
	public LeaveCategoryServiceException(int exceptionCode) {
		super();
		this.setExceptionCode(exceptionCode);
	}
	
	/** 
	 * Constructs a new Leave Category Service Exception of specified exception code and detail message 
	 * @param exceptionCode The code for this exception. The exception code is saved for later retrieval by {@link #getExceptionCode()}) method
	 * @param message The detail message for this exception. The detail message is saved for later retrieval by the {@link java.lang.Throwable#getMessage()} method.
	 */
	public LeaveCategoryServiceException(int exceptionCode, String message) {
		super(message);
		this.setExceptionCode(exceptionCode);
	}

	/** 
	 * Returns the Exception Code of this Leave Category Service Exception.
	 * @return the exception code of this Leave Category Service Exception instance
	 */
	public int getExceptionCode() {
		return exceptionCode;
	}

	public void setExceptionCode(int exceptionCode) {
		switch(exceptionCode) {
			case LEAVE_CATEGORY_ALREADY_EXIST:
			case LEAVE_CATEGORY_NOT_FOUND:
				this.exceptionCode = exceptionCode;
				break;
			
			default:
				this.exceptionCode = LEAVE_CATEGORY_UNDEFINED;
		}
	}
	
	
}
