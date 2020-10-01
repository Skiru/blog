<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
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
        /**
         * @var PostModel|null $post
         */
        $post = $options['data'] ?? null;
        $isEdit = $post && '' !== $post->headerImage;

        $builder
            ->add('title', TextType::class, [
                'attr' => [
                    'placeholder' => 'Title...'
                ]
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Content of the post',
                'required' => false,
                'attr' => [
                    'class' => 'tinymce',
                ]
            ])
            ->add('readTime', IntegerType::class, [
                'label' => 'Estimated read time [in minutes]'
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

        $builder
            ->add('category', ChoiceType::class, [
                'label' => 'Post Category',
                'required' => true,
                'choices' => [
                    'category1' => 'Category1',
                    'category2' => 'Category2'
                ]
            ])
            ->add('tags', ChoiceType::class, [
                'multiple' => true,
                'required' => false,
                'attr' => [
                    'size' => '7'
                ],
                'choices' => [
                    'notag' => 'notag',
                    'tag1' => 'tag1',
                    'tag2' => 'tag2',
                    'tag3' => 'tag2',
                    'tag4' => 'tag2',
                    'tag5' => 'tag2',
                    'tag6' => 'tag2',
                    'tag7' => 'tag2',
                    'tag8' => 'tag2',
                    'tag9' => 'tag2',
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PostModel::class,
        ]);
    }
}
