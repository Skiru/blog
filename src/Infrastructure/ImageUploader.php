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
    private SluggerInterface $slugger;

    public function __construct(string $imagesDirectory, SluggerInterface $slugger)
    {
        $this->imagesDirectory = $imagesDirectory;
        $this->slugger = $slugger;
    }

    /**
     * @throws DomainException
     * @param UploadedFile $file
     * @return string
     */
    public function upload(UploadedFile $file)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFileName = $this->slugger->slug($originalFilename);
        $fileName = $safeFileName.'-'.uniqid().'.'.$file->guessExtension();

        try {
            $file->move($this->imagesDirectory, $fileName);
        } catch (FileException $e) {
            throw new DomainException('Could not move the file:' . $e->getMessage());
        }

        return $fileName;
    }
}