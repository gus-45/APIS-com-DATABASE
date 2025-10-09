#  Endpoints da API

##  USERS

### Listar todos os usuários
```
GET http://localhost:3003/users
```

### Buscar usuário por ID
```
GET http://localhost:3003/users/1
```

### Criar novo usuário
```
POST http://localhost:3003/users
Body: { "name": "João Silva", "email": "joao@email.com" }
```

### Atualizar usuário
```
PUT http://localhost:3003/users/1
Body: { "name": "João Silva", "email": "joao@email.com" }
```

### Deletar usuário
```
DELETE http://localhost:3003/users/1
```

---

##  PETS

### Listar todos os pets
```
GET http://localhost:3003/pets
```

### Buscar pet por ID
```
GET http://localhost:3003/pets/1
```

### Criar novo pet
```
POST http://localhost:3003/pets
Body: { "name": "Thor", "user_id": 1 }
```

### Atualizar pet
```
PUT http://localhost:3003/pets/1
Body: { "name": "Thor", "user_id": 1 }
```

### Deletar pet
```
DELETE http://localhost:3003/pets/1
```
