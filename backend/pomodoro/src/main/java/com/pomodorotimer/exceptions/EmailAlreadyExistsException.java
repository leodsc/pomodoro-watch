package com.pomodorotimer.exceptions;

public class EmailAlreadyExistsException extends Exception {

    @Override
    public String getMessage() {
        return "E-mail já é cadastrado.";
    }
}
