package com.csi.leavemanagement.exceptions;

public class TranslateItemServiceException extends Exception {

	/** For CREATE operation when record with same primary key is found */
	public final static int TRANSLATE_ITEM_ALREADY_EXIST = 1;
	
	/** For READ, UPDATE, DELETE operation when primary key not found */
	public final static int TRANSLATE_ITEM_NOT_FOUND = 2;
	
	/** Field name provided is invalid */
	public final static int TRANSLATE_ITEM_INVALID_FIELDNAME = 3;
	
	/** For undefined exception code */
	public final static int TRANSLATE_ITEM_UNDEFINED = 99;
	
	/** Code for this Translate Item Service Exception*/
	private int exceptionCode;

	/** 
	 * Constructs a new Translate Item Service Exception of specified exception code and detail message 
	 * @param exceptionCode The code for this exception. The exception code is saved for later retrieval by {@link #getExceptionCode()}) method
	 */
	public TranslateItemServiceException(int exceptionCode) {
		super();
		this.setExceptionCode(exceptionCode);
	}

	/** 
	 * Constructs a new Translate Item Service Exception of specified exception code and detail message 
	 * @param exceptionCode The code for this exception. The exception code is saved for later retrieval by {@link #getExceptionCode()}) method
	 * @param message The detail message for this exception. The detail message is saved for later retrieval by the {@link java.lang.Throwable#getMessage()} method.
	 */
	public TranslateItemServiceException(int exceptionCode, String message) {
		super(message);
		this.setExceptionCode(exceptionCode);
	}
	
	/** 
	 * Returns the Exception Code of this Translate Item Service Exception.
	 * @return the exception code of this Translate Item Service Exception instance
	 */
	public int getExceptionCode() {
		return exceptionCode;
	}

	private void setExceptionCode(int exceptionCode) {
		switch(exceptionCode) {
			case TRANSLATE_ITEM_ALREADY_EXIST:
			case TRANSLATE_ITEM_NOT_FOUND:
			case TRANSLATE_ITEM_INVALID_FIELDNAME:
				this.exceptionCode = exceptionCode;
				break;
			default:
				this.exceptionCode = TRANSLATE_ITEM_UNDEFINED;
		}
	}
	
	
}
