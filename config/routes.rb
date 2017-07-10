Rails.application.routes.draw do
  get 'pages/index' => 'pages#index'
  get 'creep' => 'creep#creep'
  get 'dragracing' => 'dragracing#dragracing'
  root 'pages#index'
end
