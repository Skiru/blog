<?php

declare(strict_types=1);

namespace App\Infrastructure\Security;

class User implements BlogUserInterface, BlogUserJwtInterface
{
    private string $username;
    private array $roles;
    private string $email;
    private int $age;
    private string $rawToken;

    private function __construct(string $username, string $email, int $age, string $rawToken)
    {
        $this->username = $username;
        $this->roles = [self::DEFAULT_ROLE];
        $this->email = $email;
        $this->age = $age;
        $this->rawToken = $rawToken;
    }

    public static function fromParameters(string $username, string $email, int $age, string $rawToken): User
    {
        return new User(
            $username,
            $email,
            $age,
            $rawToken
        );
    }

    /**
     * @inheritDoc
     *
     * @return string[]
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    /**
     * @inheritDoc
     */
    public function getPassword(): ?string
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials(): void
    {
    }

    /**
     * @inheritDoc
     */
    public function getRawToken(): string
    {
        return $this->rawToken;
    }

    /**
     * @return int
     */
    public function getAge(): int
    {
        return $this->age;
    }

    public function getEmail(): string
    {
        return $this->email;
    }
}
