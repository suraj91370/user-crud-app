<?php
class User
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function create($name, $email, $password, $dob)
    {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->pdo->prepare("INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$name, $email, $hashed_password, $dob]);
    }

    public function readAll()
    {
        $stmt = $this->pdo->query("SELECT id, name, email, dob FROM users");
        return $stmt->fetchAll();
    }

    public function update($id, $name, $email, $dob)
    {
        $stmt = $this->pdo->prepare("UPDATE users SET name = ?, email = ?, dob = ? WHERE id = ?");
        return $stmt->execute([$name, $email, $dob, $id]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
