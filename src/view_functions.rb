RESTAURANT_MAPPING_TABLES = "function(doc){if(doc.restaurant_id && doc.docType && doc.docType === 'table'){emit(doc.restaurant_id, doc);}}"
RESTAURANT_MAPPING_RESERVATIONS = "function(doc){if(doc.restaurant_id && doc.docType && doc.docType === 'reservation' && doc.table_id && doc.day){emit({'restaurant_id': doc.restaurant_id, 'table_id': doc.table_id, 'day': doc.day}, doc);}}"
DOCTYPE_MAPPING_RESTAURANTS = "function(doc){if(doc.docType && doc.docType === 'restaurant'){emit(doc.docType, doc);}}"
DOCTYPE_MAPPING_TABLES = "function(doc){if(doc.docType && doc.docType === 'table'){emit(doc.docType, doc);}}"
DOCTYPE_MAPPING_RESERVATIONS = "function(doc){if(doc.docType && doc.docType === 'reservation'){emit(doc.docType, doc);}}"