package com.example.bank_employee_service.client;

import com.example.bank_employee_service.dto.TransactionDTO;
import com.example.bank_employee_service.dto.TransactionRequest;
import com.example.bank_employee_service.dto.TransferRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(
	    name = "customer-transaction-loan-service",
	    contextId = "transactionClient"
	)
public interface TransactionClient {

    @PostMapping("/api/transactions/{ssnId}/deposit")
    ResponseEntity<TransactionDTO> deposit(@PathVariable String ssnId, @RequestBody TransactionRequest request);

    @PostMapping("/api/transactions/{ssnId}/withdraw")
    ResponseEntity<TransactionDTO> withdraw(@PathVariable String ssnId, @RequestBody TransactionRequest request);

    @PostMapping("/api/transactions/transfer")
    ResponseEntity<String> transfer(@RequestBody TransferRequest request); // or Boolean, depending on monolith

    @GetMapping("/api/transactions/{ssnId}")
    ResponseEntity<List<TransactionDTO>> getTransactions(@PathVariable String ssnId);

    @PostMapping("/api/transactions/balance")
    ResponseEntity<Double> checkBalance(@RequestBody TransferRequest request); // if request only contains ssnId
}