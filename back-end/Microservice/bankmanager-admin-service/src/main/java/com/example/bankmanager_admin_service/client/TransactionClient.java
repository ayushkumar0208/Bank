package com.example.bankmanager_admin_service.client;

import com.example.bankmanager_admin_service.dto.TransactionRequest;
import com.example.bankmanager_admin_service.dto.TransactionResponse;
import com.example.bankmanager_admin_service.dto.TransferRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "customer-transaction-loan-service", contextId = "transactionClient")  // Base URL only
public interface TransactionClient {

    @PostMapping("/api/transactions/{ssnId}/deposit")
    ResponseEntity<TransactionResponse> deposit(@PathVariable("ssnId") String ssnId, @RequestBody TransactionRequest request);

    @PostMapping("/api/transactions/{ssnId}/withdraw")
    ResponseEntity<TransactionResponse> withdraw(@PathVariable("ssnId") String ssnId, @RequestBody TransactionRequest request);

    @PostMapping("/api/transactions/transfer")
    ResponseEntity<Boolean> transfer(@RequestBody TransferRequest request);

    @GetMapping("/api/transactions/{ssnId}")
    ResponseEntity<List<TransactionResponse>> getTransactions(@PathVariable("ssnId") String ssnId);
}