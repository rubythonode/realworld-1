import React from 'react';
import { ArticleForm } from '../../components/article-form';
import { Layout } from '../../components/layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import withApollo from '../../lib/with-apollo';
import { handleValidationError } from '../../utils/graphql';

const validationSchema = Yup.object({
  slug: Yup.string()
    .label('Slug')
    .required(),
  input: Yup.object({
    title: Yup.string()
      .label('Title')
      .required(),
    description: Yup.string()
      .label('Description')
      .required(),
    body: Yup.string()
      .label('Body')
      .required(),
    tagIds: Yup.array(Yup.string())
      .label('Tags')
      .test('', '${path} is a required field', value => Array.isArray(value))
  })
});

function EditorUpdatePage() {
  const router = useRouter();
  const editorUpdate = useQuery(EditorUpdatePageQuery, {
    variables: {
      slug: router.query.slug
    }
  });
  const [updateArticle] = useMutation(EditorUpdatePageUpdateArticleMutation);

  if (editorUpdate.loading) return null;

  return (
    <Layout userUsername={editorUpdate.data.viewer?.username}>
      <div className="editor-page">
        <ArticleForm
          validationSchema={validationSchema}
          initialValues={{
            slug: editorUpdate.data.article.slug ?? '',
            input: {
              title: editorUpdate.data.article.title ?? '',
              description: editorUpdate.data.article.description ?? '',
              body: editorUpdate.data.article.body ?? '',
              tagIds: (editorUpdate.data.article.tags ?? []).map(tag => tag.id)
            }
          }}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            updateArticle({ variables: values })
              .then(res => {
                router.push(
                  '/article/[slug]',
                  `/article/${res.data.updateArticle.article.slug}`
                );
              })
              .catch(err => {
                handleValidationError(err, setStatus);
                console.error(err);
                setSubmitting(false);
              });
          }}
        />
      </div>
    </Layout>
  );
}

EditorUpdatePage.fragments = {
  article: gql`
    fragment EditorUpdatePageArticleFragment on Article {
      body
      description
      slug
      title
      tags {
        id
        name
      }
    }
  `
};

const EditorUpdatePageUpdateArticleMutation = gql`
  mutation EditorUpdatePageUpdateArticleMutation(
    $slug: ID!
    $input: UpdateArticleInput!
  ) {
    updateArticle(slug: $slug, input: $input) {
      article {
        ...EditorUpdatePageArticleFragment
      }
    }
  }
  ${EditorUpdatePage.fragments.article}
`;

const EditorUpdatePageQuery = gql`
  query EditorUpdatePageQuery($slug: ID!) {
    viewer {
      username
    }
    article: articleBySlug(slug: $slug) {
      ...EditorUpdatePageArticleFragment
    }
  }
  ${EditorUpdatePage.fragments.article}
`;

export default withApollo(EditorUpdatePage);
