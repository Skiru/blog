<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Tag\Query\TagQueryInterface;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Tag\Tag;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Length;
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
        $isEdit = null === $post ?  false : $post->isEdit();

        $builder
            ->add('title', TextType::class, [
                'attr' => [
                    'placeholder' => 'Title...'
                ],
                'empty_data' => '',
                'constraints' => [
                    new Length([
                        'min' => 1,
                        'max' => 255
                    ])
                ]
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Content of the post',
                'attr' => [
                    'class' => 'tinymce',
                ]
            ])
            ->add('readTime', IntegerType::class, [
                'label' => 'Estimated read time [in minutes]'
            ]);

        $imageConstraints = [
            new File([
                'maxSize' => '2048k',
                'mimeTypes' => [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/bmp'
                ],
                'mimeTypesMessage' => 'Please upload a valid Image',
            ])
        ];

        if (!$isEdit) {
            $imageConstraints[] = new NotNull([
                'message' => 'Please upload an image',
            ]);
        }
        $builder
            ->add('headerImage', FileType::class, [
                'label' => 'Header image (*.jpeg, *.png, *.gif, *.bnp)',
                'mapped' => false,
                'required' => false,
                'constraints' => $imageConstraints
            ]);

        $builder->add('published', CheckboxType::class, [
            'label' => 'Publish this post?',
            'value' => null === $post ? false : $post->published
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
            'csrf_token_id' => 'post_token'
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
            return [Category::DEFAULT_CATEGORY => Category::DEFAULT_CATEGORY];
        }

        $output = [];
        foreach ($categories as $category => $key) {
            $output[$key->getName()] = $key->getName();
        }

        return $output;
    }
}
