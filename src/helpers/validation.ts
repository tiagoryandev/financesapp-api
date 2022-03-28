/* eslint-disable no-useless-escape */

export const validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isDate = (dateStr: string) => {
	return !isNaN(new Date(dateStr).getDate());
};