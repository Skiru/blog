<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Tag\Query\TagQueryInterface;
use App\Application\Tag\Query\TagView;
use App\Domain\Post\Tag\Tag;
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
    private TagQueryInterface $tagQuery;
    private CategoryQueryInterface $categoryQuery;

    public function __construct(TagQueryInterface $tagQuery, CategoryQueryInterface $categoryQuery)
    {
        $this->tagQuery = $tagQuery;
        $this->categoryQuery = $categoryQuery;
    }

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
                'choices' => $this->findCategories()
            ])
            ->add('tags', ChoiceType::class, [
                'multiple' => true,
                'required' => false,
                'attr' => [
                    'size' => '7'
                ],
                'choices' => $this->findTags()
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PostModel::class,
        ]);
    }

    private function findTags(): array
    {
        $tags = $this->tagQuery->findAll();
        $output = [Tag::EMPTY_TAG => Tag::EMPTY_TAG];
        foreach ($tags as $tag => $key) {
            $tagName = $key->getName();
            $output[$tagName] = $tagName;
        }

        return $output;
    }

    private function findCategories(): array
    {
        $categories = $this->categoryQuery->findAll();
        if (empty($categories)) {
            return ['blog' => 'blog'];
        }

        return $categories;
    }
}
