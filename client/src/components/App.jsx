import user from '../development-data/user';
import habits from '../development-data/habits';

function App() {
  return (
    <div>
      <h1>ProgressPal</h1>
      <h2>Hello {user.first_name}!</h2>
      {habits.map(habit => {
        return (<div key={habit.id}>{habit.name}</div>);
      })}
    </div>
  );
}

export default App;
