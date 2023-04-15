Feature: User's log in

Scenario: The user wants to log into the system
  Given An unlogged user
  When I select a pod provider and press submit
  Then The pods provider login page should be shown in the screen