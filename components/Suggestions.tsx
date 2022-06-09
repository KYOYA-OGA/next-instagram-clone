import React, { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { SuggestionUser } from '../types';

interface Props {}

const Suggestions: React.FC<Props> = () => {
  const [suggestionPeople, setSuggestionPeople] = useState<SuggestionUser[]>(
    []
  );

  useEffect(() => {
    const fetchedPeople = minifaker.array(5, (i) => ({
      username: minifaker.username({ locale: 'en' }),
      jobTitle: minifaker.jobTitle(),
      id: i,
    }));
    setSuggestionPeople(fetchedPeople);
  }, []);

  return (
    <div className="mt-8">
      <div className="flex justify-between text-sm">
        <h3 className="font-bold text-gray-600">Suggestion for you</h3>
        <button className="font-semibold text-gray-600">See all</button>
      </div>
      <div className="mt-6 space-y-4">
        {suggestionPeople.map((person) => (
          <div
            key={person.id}
            className="mt-4 flex items-center justify-between space-x-4"
          >
            <img
              src={`https://i.pravatar.cc/150?img=${Math.floor(
                Math.random() * 70
              )}`}
              alt=""
              className="h-10 w-10 rounded-full border p-0.5"
            />
            <div className="flex-1">
              <h2 className="text-sm font-semibold">{person.username}</h2>
              <p className="w-64 truncate text-sm text-gray-600">
                {person.jobTitle}
              </p>
            </div>
            <button className="font-semibold text-blue-600">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
