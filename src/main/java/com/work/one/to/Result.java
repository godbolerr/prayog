package com.work.one.to;

import java.util.ArrayList;
import java.util.List;

public class Result {
	
	boolean status;
	
	List<String> messages;

	/**
	 * @return the status
	 */
	public boolean isStatus() {
		return status;
	}

	public boolean isSuccessful() {
		return status;
	}
	
	/**
	 * @param status the status to set
	 */
	public void setStatus(boolean status) {
		this.status = status;
	}

	/**
	 * @return the messages
	 */
	public List<String> getMessages() {
		return messages;
	}

	/**
	 * @param messages the messages to set
	 */
	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
	
	/**
	 * Add message to current list of message.
	 * @param message
	 */
	public void addMessage(String message){
		if ( messages == null ) {
			messages = new ArrayList<String>();
		}		
		messages.add(message);
	
	}

}
