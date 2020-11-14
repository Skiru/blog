<?php

declare(strict_types=1);

namespace App\Infrastructure;

use App\Domain\DomainException;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class ImageUploader
{
    private string $imagesDirectory;
    private string $fileUrl;
    private SluggerInterface $slugger;

    public function __construct(string $imagesDirectory, string $fileUrl, SluggerInterface $slugger)
    {
        $this->imagesDirectory = $imagesDirectory;
        $this->fileUrl = $fileUrl;
        $this->slugger = $slugger;
    }

    /**
     * @throws DomainException
     */
    public function upload(UploadedFile $file): string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFileName = $this->slugger->slug($originalFilename);
        $fileName = $safeFileName.'-'.uniqid().'.'.$file->guessExtension();

        try {
            $file->move($this->imagesDirectory, $fileName);
        } catch (FileException $e) {
            throw new DomainException('Could not move the file:' . $e->getMessage());
        }

        return sprintf('%s/%s', $this->fileUrl, $fileName);
    }
}