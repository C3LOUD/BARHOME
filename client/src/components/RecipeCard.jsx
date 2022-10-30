import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './ui/Icon';
import Tag from './ui/Tag';

const RecipeCard = forwardRef((props, ref) => {
  const { title, thumbnail, alcoholic, category } = props.recipe;

  const tagsContent = [alcoholic, category];

  const navigate = useNavigate();

  const savedHandler = (e) => {
    e.stopPropagation();
    console.log('do something');
  };

  return (
    <div
      className="bg-white-100 rounded flex flex-col items-center justify-between pt-4 gap-4 overflow-hidden hover:-translate-y-2 transition-all cursor-pointer hover:bg-white-200"
      ref={ref}
      onClick={(e) => {
        navigate(
          `/dashboard/recipes/${
            e.target.closest('[data-id]').dataset.id
          }?isEditing=false`
        );
      }}
      data-id={title}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt="cocktail thumbnail"
          className="inline-block w-44"
        />
        <div
          className="absolute top-1 left-1 bg-white-100/50 rounded-full px-1 py-1 shadow-md hover:bg-white-100"
          onClick={savedHandler}
        >
          <Icon name="bookmark-outline" style="text-2xl text-primary-main" />
        </div>
      </div>
      <div className="flex gap-2">
        {tagsContent.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>
      <p className="heading-h3 font-primary font-bold text-center">{title}</p>
      <a className="bg-primary-main w-full text-center py-2 text-white-400 font-secondary font-semibold cursor-pointer hover:bg-primary-tint-200">
        Start Mixing
      </a>
    </div>
  );
});

export default RecipeCard;
