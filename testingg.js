/*POST http://localhost:3000/incident/user/report
Content-Type: application/json

Body:
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "title": "Broken CCTV",
  "description": "Camera near gate not working",
  "location": "PTC Building",
  "date": "2025-10-16",
  "category": "equipment malfunction",
  "priority": "high"
}
```

### **2️⃣ USER: Get Their Reports**
```
GET http://localhost:3000/incident/user/john@example.com
```

### **3️⃣ ADMIN: Get All Reports**

GET http://localhost:3000/incident/admin/all

admin get all pending reports
GET http://localhost:3000/incident/admin/pending

### **4️⃣ ADMIN: Get Pending Reports**

GET http://localhost:3000/incident/admin/status/Pending


### **5️⃣ ADMIN: Update Status & Notify User**

PUT http://localhost:3000/incident/admin/{ID}
Content-Type: application/json

Body:
{
  "status": "Under Review",
  "adminNotes": "Investigating the broken camera"
}
```

Response includes notification sent to user! ✅

### **6️⃣ USER: Check Notifications**

GET http://localhost:3000/incident/user/john@example.com/{ID}

DELETE http://localhost:3000/incident/admin/{ID}
*/