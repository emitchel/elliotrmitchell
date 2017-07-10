Rails.application.routes.draw do
  get 'pages/index' => 'pages#index'
  root 'pages#index'
end
