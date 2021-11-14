package com.js.org.model;

import java.util.Iterator;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO	)
	private Long id;
	private String name;
	@OneToMany
	@Cascade(CascadeType.ALL)
	
	private List<Transaction> transactionList;
	
	public Long getStorageAmount() {
		Long amount = 0L;
		try {
			for (Transaction transaction : transactionList) {
				amount += transaction.getAmount();
			} 
		} catch (Exception e) {
			// TODO: handle exception
		}
		return amount;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Transaction> getTransactionList() {
		return transactionList;
	}
	public void setTransactionList(List<Transaction> transactionList) {
		this.transactionList = transactionList;
	}

	
}
