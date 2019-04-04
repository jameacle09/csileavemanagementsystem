package com.csi.leavemanagement.exceptions;

public class PublicHolidayServiceException extends Exception {

	/** For CREATE operation when record with same primary key is found */
	public static final int PUBLIC_HOLIDAY_ALREADY_EXIST = 1;
	
	/** For READ, UPDATE, DELETE operation when primary key not found */
	public static final int PUBLIC_HOLIDAY_NOT_FOUND = 2;
	
	/** Date value is invalid */
	public static final int PUBLIC_HOLIDAY_INVALID_DATE = 3;
	
	/** For undefined exception code */
	public static final int PUBLIC_HOLIDAY_UNDEFINED = 99;
	
	/** Code for this Public Holiday Service Exception*/
	private int exceptionCode;
	
	/** 
	 * Constructs a new Public Holiday Service Exception of specified exception code 
	 * @param exceptionCode The code for this exception. The exception code is saved for later retrieval by {@link #getExceptionCode()}) method
	 */
	public PublicHolidayServiceException(int exceptionCode) {
		super();
		this.setExceptionCode(exceptionCode);
	}

	/** 
	 * Constructs a new Public Holiday Service Exception of specified exception code and detail message 
	 * @param exceptionCode The code for this exception. The exception code is saved for later retrieval by {@link #getExceptionCode()}) method
	 * @param message The detail message for this exception. The detail message is saved for later retrieval by the {@link java.lang.Throwable#getMessage()} method.
	 */
	public PublicHolidayServiceException(int exceptionCode, String message) {
		super(message);
		this.setExceptionCode(exceptionCode);
	}
	
	/** 
	 * Returns the Exception Code of this Public Holiday Service Exception.
	 * @return the exception code of this Public Holiday Service Exception instance
	 */
	public int getExceptionCode() {
		return this.exceptionCode;
	}
	
	private void setExceptionCode(int exceptionCode) {
		switch(exceptionCode) {
			case PUBLIC_HOLIDAY_ALREADY_EXIST:
			case PUBLIC_HOLIDAY_NOT_FOUND:
			case PUBLIC_HOLIDAY_INVALID_DATE:
				this.exceptionCode = exceptionCode;
				break;
			default :
				this.exceptionCode = PUBLIC_HOLIDAY_UNDEFINED;
		}
	}
}
