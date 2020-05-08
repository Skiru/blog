<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\NotNull;

class PostType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /** @var PostModel|null $post */
        $post = $options['data'] ?? null;
        $isEdit = $post && '' !== $post->headerImage;

        $builder
            ->add('title', TextType::class, [
                'label' => 'Title of your post'
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Content of the post'
            ]);

        $imageConstraints = [
            new Image([
                'maxSize' => '5M'
            ])
        ];

        if (!$isEdit || !$post->headerImage) {
            $imageConstraints[] = new NotNull([
                'message' => 'Please upload an image',
            ]);
        }
        $builder
            ->add('headerImage', FileType::class, [
                'label' => 'Header image (*.jpg, *.png, *.svg)',
                'mapped' => false,
                'required' => false,
                'constraints' => $imageConstraints
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PostModel::class,
        ]);
    }
}